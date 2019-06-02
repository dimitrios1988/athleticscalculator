import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  onRankingTables() {
    window.open("https://www.iaaf.org/world-ranking-rules/basics", "_blank");
  }

  onScoringTables() {
    window.open("https://www.iaaf.org/news/iaaf-news/scoring-tables-2017", "_blank");
  }

}
