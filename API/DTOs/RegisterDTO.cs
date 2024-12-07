using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDTO
{
    [Required]
    required public string Username { get; set; }
    [Required]
    required public string password {get; set;  }
}
