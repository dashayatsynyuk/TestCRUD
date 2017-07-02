using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestDM.Model
{
    [Table("Regions")]
    public class Regions
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RegionsId { get; set; }
        [Required, StringLength(200,ErrorMessage ="Input should be less than 200 symbols.")]
        public string Name { get; set; }
        [Required, StringLength(10, ErrorMessage ="Input should be less than 10 symbols.")]
        public string Timezone { get; set; }
    }
}
