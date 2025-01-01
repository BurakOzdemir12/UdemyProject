using Azure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Repository.Entities;
using UdemyProject.Repository.Interfaces;
using UdemyProject.Service.Interfaces;
using UdemyProject.Shared.Configurations;
using UdemyProject.Shared.DTOs;

namespace UdemyProject.Service.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly List<Client> _clients;
        private readonly ITokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<UserRefreshToken>_userRefreshToken;

        public AuthenticationService(
            IOptions<List<Client>> optionsClient, 
            ITokenService tokenService,
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IUnitOfWork unitOfWork, 
            IGenericRepository< UserRefreshToken >userRefreshToken)
        {
            _clients = optionsClient.Value;

            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
            _unitOfWork = unitOfWork;
            _userRefreshToken = userRefreshToken;
        }

        public ClientTokenDto CreateClientToken(ClientLoginDto clientLoginDto)
        {
            var client = _clients.FirstOrDefault(x=>x.Id == clientLoginDto.ClientId && x.Secret == clientLoginDto.ClientSecret);

            if (client == null)
            {
                throw new Exception("ClientId or ClientSecret not found");
            }

            var token = _tokenService.CreateClientToken(client);

            return token;
        }

        public async Task<TokenDto> CreateTokenAsync(LoginDto loginDto)
        {
            if (loginDto == null) { throw new ArgumentNullException(nameof(loginDto)); }

            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
            {
                throw new Exception("Email veya Parola Yanlış");
            }
            if (!await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                throw new Exception("Email veya Parola Yanlış");
            }

            var token = _tokenService.CreateToken(user);

            var userRefreshTokens =
                await _userRefreshToken.Where(x => x.UserId == user.Id.ToString()).SingleOrDefaultAsync();

            if (userRefreshTokens == null)
            {
                await _userRefreshToken.AddAsync(new UserRefreshToken
                {
                    UserId = user.Id.ToString(),
                    Code = token.RefreshToken,
                    Expiration = token.RefreshTokenExpiration
                }
                    );
            }
            else
            {
                userRefreshTokens.Code = token.RefreshToken;
                userRefreshTokens.Expiration = token.RefreshTokenExpiration;
            }
            await _unitOfWork.CommitAsync();

            return token;
        }

        public async Task<TokenDto> CreateTokenByRefreshToken(string refreshToken)
        {
            var existRefreshToken =
                          await _userRefreshToken.Where(x=> x.Code == refreshToken).SingleOrDefaultAsync();
            //fast fail
            if (existRefreshToken == null)
            {
                throw new Exception("Refresh token not found");
            }


            if (existRefreshToken.Expiration < DateTime.Now)
            {
                throw new Exception("Refresh token has expired");
            }


            var user = await _userManager.FindByIdAsync(existRefreshToken.UserId);

            if (user == null)
            {
                throw new Exception("User Id not found");
            }

            var tokenDto = _tokenService.CreateToken(user);

            existRefreshToken.Code = tokenDto.RefreshToken;
            existRefreshToken.Expiration = tokenDto.RefreshTokenExpiration;

            await _unitOfWork.CommitAsync();

            return tokenDto;
        }

        public async Task<TokenDto> RevokerefreshToken(string refreshToken)
        {
            var existRefreshToken = await _userRefreshToken.Where(x => x.Code == refreshToken).SingleOrDefaultAsync();
            if (existRefreshToken == null)
            {
                throw new Exception("Refresh token not found");
            }
            _userRefreshToken.Remove(existRefreshToken);

            await _unitOfWork.CommitAsync();

            return null;


        }

       
    }
}
