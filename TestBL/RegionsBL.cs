using System.Data.Entity;
using System.Linq;
using TestDM.Model;

namespace TestBL
{
    public class RegionsBL : BusinessLogic
    {
        public int Create(Regions createRegion)
        {
            Status result = Status.ERROR;
            db.RegionsDataSet.Add(createRegion);
            int count = db.SaveChanges();
            if (count != 0)
            {
                result = Status.SUCCESS;
            }
            return (int)result;
        }

        public Regions Read(int id)
        {
            return db.RegionsDataSet.Find(id);
        }

        public IQueryable<Regions> ReadList()
        {
            return db.RegionsDataSet;
        }

        public int Update(Regions updateRegion)
        {
            Status result = Status.ERROR;
            Regions regions = db.RegionsDataSet.Find(updateRegion.RegionsId);
            if (regions.RegionsId == updateRegion.RegionsId)
            {
                db.Entry(regions).CurrentValues.SetValues(updateRegion);
                db.Entry(regions).State = EntityState.Modified;
                int count = db.SaveChanges();
                if (count != 0)
                {
                    result = Status.SUCCESS;
                }
            }
            return (int)result;
        }

        public int Delete(int id)
        {
            Status result = Status.ERROR;
            Regions regions = db.RegionsDataSet.Find(id);
            if (regions != null)
            {
                db.RegionsDataSet.Remove(regions);
                int count = db.SaveChanges();
                if (count != 0)
                {
                    result = Status.SUCCESS;
                }
            }
            return (int)result;
        }

    }
}
