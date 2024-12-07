using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class LoginDTO
{
    [Required]
    required public string Username {get; set; }
    [Required]
    required public string Password { get; set; }
}
