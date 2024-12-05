using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[ApiController]
[Route("api/[controller]")]
public class UsersController(DataContext context) : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<AppUser>> GetUsers()
    {
        var users = context.Users.ToList();
        return Ok(users);
    }

    [HttpGet("{id:int}")]
    public ActionResult<AppUser> GetUser(int id)
    {
        if (User == null)
        {
            return NotFound();
        }

        var user = context.Users.Find(id);
        return Ok(user);
    }
}
