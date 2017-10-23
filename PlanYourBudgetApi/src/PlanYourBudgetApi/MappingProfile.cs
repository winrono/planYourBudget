using AutoMapper;
using PlanYourBudgetApi.Models;
using PlanYourBudgetApi.Models.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanYourBudgetApi
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, RegisteringUser>();
            CreateMap<RegisteringUser, User>();
        }
    }
}
