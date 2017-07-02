namespace TestDM
{
    using global::TestDM.Model;
    using System.Data.Entity;

    public class TestDAL : DbContext
    {
        // Your context has been configured to use a 'TestDM' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'TestDM.TestDM' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'TestDM' 
        // connection string in the application configuration file.
        public TestDAL()
            : base("name=TestDM")
        {
        }

        public virtual DbSet<Regions> RegionsDataSet { get; set; }
    }

}