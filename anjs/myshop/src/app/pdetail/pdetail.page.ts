import { Component, OnInit } from '@angular/core';
// 获取传过来的参数id
import { ActivatedRoute } from '@angular/router';
import { GetdataService } from '../services/getdata.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pdetail',
  templateUrl: './pdetail.page.html',
  styleUrls: ['./pdetail.page.scss'],
})
export class PdetailPage implements OnInit {
  public selectvalue:any = "info";
  public pdetail:any = {};
  public config:any = [];
  public num:number = 1;
  public cartnum:number = 0;
  constructor(public ac:ActivatedRoute, public gdata:GetdataService, public nav:NavController) { }

  ngOnInit() {
    this.config = this.gdata.config;
    this.ac.queryParams.subscribe((data:any)=>{
      this.getPdetail(data.id);
    });
    this.getcartnum();
  }

  getPdetail(id)
  {
    let api = "shop/api/pdetail.php?id="+id;
    this.gdata.getApiData(api).then((response:any)=>{
      this.pdetail = response.result[0];
    })
  }

  goback()
  {
    this.nav.back();
  }

  selectspan(e)
  {
    //console.log(e);
    let el = e.target;
    if (el.nodeName == "SPAN")
    {
      let parent = el.parentNode;
      let children = parent.children;
      for (let i=0; i<children.length; i++)
      {
        children[i].className = '';
      }
      el.className = "active";
    }
    
  }

  sub()
  {
    if (this.num>1)
    {
      this.num--;
    }
    
  }

  plus()
  {
    this.num++;
  }

  addcart()
  {
    // 购物车里应该包含哪些信息
    // 商品标题，id, 图片, 价格, 数量, 属性
    let product_title = this.pdetail.title;
    let product_id = this.pdetail._id;
    let product_pic = this.pdetail.pic;
    let product_price = this.pdetail.price;
    let product_count = this.num;
    let product_attr = '';
    // 处理属性，属性组合处理成一个空格间隔的字符串
    // 首先找到选中的span, 获取span中的内容
    let activeSpan = document.querySelectorAll(".r_attr .active");
    for (let i=0; i<activeSpan.length; i++)
    {
      if (i==0)
      {
        product_attr = activeSpan[i].innerHTML;
      }
      else
      {
        product_attr+= " "+activeSpan[i].innerHTML;
      }
    }
    //console.log(product_attr);
    let productJson = {
      product_title,
      product_id,
      product_pic,
      product_price,
      product_count,
      product_attr
    }
    //console.log(productJson);
    // 添加到购物车中
    // 后台添加一个购物车表，把数据添加到表中，需要数据登录，api和后台交互
    // 本地存储，把数据存储到本地存储中，这个不需要登录
    let cartlist = JSON.parse(localStorage.getItem('cartlist'));
    // cartlist 存不存在
    if (cartlist && cartlist.length>0)
    {
      // 购物车中有没有该商品
      if (this.hasProduct(cartlist,productJson))
      {
        // 修改数量
        for (let i=0; i<cartlist.length; i++)
        {
          if (cartlist[i].product_id == productJson.product_id && cartlist[i].product_attr == productJson.product_attr)
          {
            cartlist[i].product_count += productJson.product_count;
            localStorage.setItem('cartlist',JSON.stringify(cartlist));
          }
        }
      }
      else
      {
        cartlist.push(productJson);
        localStorage.setItem('cartlist',JSON.stringify(cartlist));
      }
    }
    else
    {
      // 直接把数据添加到购物车中
      let temp:any[] = [];
      temp.push(productJson);
      localStorage.setItem('cartlist',JSON.stringify(temp));
    }
    this.cartnum += productJson.product_count;
  }

  hasProduct(cartlist,product):boolean
  {
    if (cartlist && cartlist.length>0)
    {
      for (let i=0; i<cartlist.length; i++)
      {
        if (cartlist[i].product_id == product.product_id && cartlist[i].product_attr == product.product_attr)
        {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  getcartnum()
  {
    let cartlist = JSON.parse(localStorage.getItem('cartlist'));
    let sum = 0;
    if (cartlist && cartlist.length>0)
    {
      for (let i=0; i<cartlist.length; i++)
      {
        sum += cartlist[i].product_count;
      }
      this.cartnum = sum;
    }
  }
}
