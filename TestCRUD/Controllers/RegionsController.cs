using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using TestBL;
using TestDM;
using TestDM.Model;

namespace TestCRUD.Controllers
{
    public class RegionsController : ApiController
    {
        private TestDAL db = new TestDAL();

        // GET: api/Regions
        public IQueryable<Regions> GetRegionsDataSet()
        {
            RegionsBL regionsCRUD = new RegionsBL();
            return regionsCRUD.ReadList();
        }

        [ResponseType(typeof(Regions))]
        public Regions GetRegions(int id)
        {
            RegionsBL regionsCRUD = new RegionsBL();
            return regionsCRUD.Read(id);
        }

        // PUT: api/Regions/5
        [ResponseType(typeof(void))]
        public int PutRegions(Regions regions)
        {
            RegionsBL regionsCRUD = new RegionsBL();
            int result = regionsCRUD.Update(regions);
            return result;
        }

        // POST: api/Regions
        [ResponseType(typeof(void))]
        public int PostRegions(Regions regions)
        {
            RegionsBL regionsCRUD = new RegionsBL();
            int result = regionsCRUD.Create(regions);
            return result;
        }

        // DELETE: api/Regions/5
        [ResponseType(typeof(void))]
        public int DeleteRegions(int id)
        {
            RegionsBL regionsCRUD = new RegionsBL();
            int result = regionsCRUD.Delete(id);
            return result;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RegionsExists(int id)
        {
            return db.RegionsDataSet.Count(e => e.RegionsId == id) > 0;
        }
    }
}