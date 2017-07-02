namespace TestDM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Regions",
                c => new
                    {
                        RegionsId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 200),
                        Timezone = c.String(nullable: false, maxLength: 10),
                    })
                .PrimaryKey(t => t.RegionsId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Regions");
        }
    }
}
