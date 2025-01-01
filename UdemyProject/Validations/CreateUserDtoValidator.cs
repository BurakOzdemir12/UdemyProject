using UdemyProject.Shared.DTOs;
using FluentValidation;

namespace UdemyProject.API.Validations
{
   
public class CreateUserDtoValidator : AbstractValidator<CreateUserDto>
    {
        public CreateUserDtoValidator()
        {
            RuleFor(x => x.Email).NotEmpty().WithMessage("Email alanı boş olamaz");
            RuleFor(x => x.UserName).NotEmpty().WithMessage("Kullanıcı adı boş olamaz");
            RuleFor(x => x.Password).NotEmpty().WithMessage("Şifre alanı boş olamaz");
            RuleFor(x => x.FullName).NotEmpty().WithMessage("Ad ve Soyad boş olamaz");
        }
    }

}
