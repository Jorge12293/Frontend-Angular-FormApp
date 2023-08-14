import { Component, OnInit } from '@angular/core';

interface MenuItem {
  title:string;
  route:string;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  public reactiveMenu : MenuItem[] = [
    { title:'Basic', route:'./reactive/basic'},
    { title:'Dynamic', route:'./reactive/dynamic'},
    { title:'Switches', route:'./reactive/switches'}
  ];

  public authMenu: MenuItem[] = [
    {title:'Register', route: './auth'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
