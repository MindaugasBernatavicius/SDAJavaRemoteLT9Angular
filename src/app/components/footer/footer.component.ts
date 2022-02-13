import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
    '.footer {\n' +
    '  position: absolute;\n' +
    '  bottom: 0;\n' +
    '  width: 100%;\n' +
    '  height: 60px;\n' +
    '  line-height: 60px; /* Vertically center the text there */\n' +
    '  background-color: #f5f5f5;\n' +
    '}'
  ],
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
