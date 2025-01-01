using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Shared.DTOs;

namespace UdemyProject.Service.Interfaces
{
    public interface IAuthenticationService
    {
        Task<TokenDto> CreateTokenAsync(LoginDto loginDto);
        Task<TokenDto> CreateTokenByRefreshToken(string refreshToken);
        Task<TokenDto> RevokerefreshToken(string refreshToken);
        ClientTokenDto CreateClientToken(ClientLoginDto clientLoginDto);
    }
}
