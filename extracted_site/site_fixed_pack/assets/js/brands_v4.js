
(function(){
  const host = document.getElementById('brandStrip'); if(!host) return;
  const list = ["hp","dell","asus","acer","samsung","msi","gigabyte","lenovo","epson","brother","canon","cooler-master","zebronics","aoc","imageking","hyperx","ant-esport","evofox","beetel","cp-plus","hikvision","portronics","fingers","evm","seagate","western-digital","crucial","adata","xpg","kingston","sandisk","clarion","boat","noise"];
  const track = document.createElement('div'); track.className='track'; host.appendChild(track);
  const link = k => ({
    "hp":"https://www.hp.com/","dell":"https://www.dell.com/","asus":"https://www.asus.com/",
    "acer":"https://www.acer.com/","samsung":"https://www.samsung.com/","msi":"https://www.msi.com/",
    "gigabyte":"https://www.gigabyte.com/","lenovo":"https://www.lenovo.com/","epson":"https://www.epson.co.in/",
    "brother":"https://www.brother.in/","canon":"https://in.canon/","cooler-master":"https://coolermaster.com/",
    "zebronics":"https://zebronics.com/","aoc":"https://aoc.com/","imageking":"https://imagekingtoners.com/",
    "hyperx":"https://www.hyperx.com/","ant-esport":"https://antesports.com/","evofox":"https://evofox.in/",
    "beetel":"https://beetel.in/","cp-plus":"https://cpplusworld.com/","hikvision":"https://www.hikvision.com/",
    "portronics":"https://portronics.com/","fingers":"https://www.fingers.co.in/","evm":"https://www.evmindia.com/",
    "seagate":"https://www.seagate.com/","western-digital":"https://www.westerndigital.com/","crucial":"https://www.crucial.in/",
    "adata":"https://www.adata.com/","xpg":"https://xpg.com/","kingston":"https://www.kingston.com/",
    "sandisk":"https://www.sandisk.in/","clarion":"https://www.clarionindia.in/","boat":"https://www.boat-lifestyle.com/",
    "noise":"https://www.gonoise.com/"
  }[k]||"#");
  function add(k){
    const a=document.createElement('a'); a.href=link(k); a.target="_blank"; a.rel="noopener";
    a.className='brandlogo'; a.innerHTML = `<img alt="${k}" src="/assets/brands/${k}.svg" onerror="this.src='/assets/brands/${k}.png'">`;
    track.appendChild(a);
  }
  list.forEach(add); list.forEach(add);
})();
