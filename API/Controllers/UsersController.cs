using System;
using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper, 
    IPhotoService photoService) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
    {
        var users = await userRepository.GetMembersAsync();

        return Ok(users);
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<MemberDTO>> GetUser(string username)
    {
        var user = await userRepository.GetMemberAsync(username);
        if (user == null)
        {
            return NotFound();
        }
        return user;
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDTO)
    {
        var user = await userRepository.GetUserByUsermameAsync(User.GetUsername());

        if (user == null)
        {
            return BadRequest("Could not find user");
        }

        mapper.Map(memberUpdateDTO, user);

        if (await userRepository.SaveAllSync()) 
        {
            return NoContent();
        }
        return BadRequest("Failed to update the user");
    }
    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDTO>> AddPhoto(IFormFile file)
    {
        var user = await userRepository.GetUserByUsermameAsync(User.GetUsername());

        if(user == null) return BadRequest("Cannot update user.");

        var results = await photoService.AddPhotoAsync(file);

        if(results.Error != null) return BadRequest(results.Error.Message);

        var photo = new Photo
        {
            Url=results.SecureUrl.AbsoluteUri,
            PublicId = results.PublicId
        };

        user.Photos.Add(photo);

        if(await userRepository.SaveAllSync()) return mapper.Map<PhotoDTO>(photo);

        return BadRequest("Problem adding photo");
    }
}
