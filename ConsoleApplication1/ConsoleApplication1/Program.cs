using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            var f = new Foo();
            f.Name = "first";
            DoWork(f);

            Console.WriteLine(f.Name);
        }

        static void DoWork(Foo f)
        {
            f.Name = "heeey!";
        }
    }

    class Foo
    {
        public string Name { get; set; }
    }
}
