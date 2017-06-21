using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PlanYourBudgetApi.Data;
using PlanYourBudgetApi.Models;
using PlanYourBudgetApi.Models.Internal;

namespace PlanYourBudgetApi.Data
{
    public class UserRepository : IUserRepository
    {
        private BudgetContext _db;
        public UserRepository(BudgetContext db)
        {
            _db = db;
        }

        public User GetUser(LoginUser user)
        {
            var dbUser = _db.Users.SingleOrDefault(u => u.UUID == user.UUID && u.Password == user.Password);
            return dbUser;
        }
        /// <summary>
        /// Returns true if user successfully registered and false if user already exists in DB
        /// </summary>
        /// <param name="user">App user</param>
        public bool Register(User user)
        {
            var dbUser = _db.Users.Find(user.UUID);

            if (dbUser == null)
            {
                _db.Users.Add(user);

                _db.SaveChanges();

                return true;
            }
            else
            {
                return false;
            }
        }

        public IEnumerable<FoundUser> FindUsers(string searchTerm)
        {
            var matchingUsers = _db.Users.Where(x => x.FullName.ToLower().Contains(searchTerm.ToLower()))
                                         .Select(x => new FoundUser() { UUID = x.UUID, FullName = x.FullName });

            return matchingUsers;
        }

        public void SetBudget(UserBudget userBudget)
        {
            var user = _db.Users.Find(userBudget.UUID);
            user.Budget = userBudget.Amount;
            _db.SaveChanges();
        }
    }
}
