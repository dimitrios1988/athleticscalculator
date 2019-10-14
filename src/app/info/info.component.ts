import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onRankingTables() {
    window.open('https://www.iaaf.org/world-ranking-rules/basics', '_blank');
  }

  onScoringTables() {
    window.open('https://www.iaaf.org/news/iaaf-news/scoring-tables-2017', '_blank');
  }

  onContact() {
    window.open('mailto:dimi.chondrokoukis@gmail.com?Subject=Athletics%20Ranking%20Points%20Calculator', '_blank');
  }

}
