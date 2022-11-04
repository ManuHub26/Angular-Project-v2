import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {combineLatest, map, Observable, startWith} from "rxjs";
import {CandidatesService} from "../../services/candidates.service";
import {Candidate} from "../../models/candidate.model";
import {FormBuilder, FormControl} from "@angular/forms";
import {CandidatesSearchType} from "../../enums/candidates-search-type.enum";

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {

  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;

  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  searchTypeOptions!: {
    value: CandidatesSearchType,
    label: string
  }[];

  constructor(private candidatesService: CandidatesService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.candidatesService.getCandidatesFromServer();
    this.initForm();
    this.initObservable();
  }

  private initObservable() {
    this.loading$ = this.candidatesService.loading$;
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
    );
    const searchType$: Observable<CandidatesSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value),
    )
    this.candidates$ = combineLatest([
      search$,
      searchType$,
      this.candidatesService.candidates$
    ]).pipe(
      map(([search, searchType, candidates]) => candidates.filter(candidate => candidate[searchType]
        .toLowerCase()
        .includes(search as string)))
    );
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control("");
    this.searchTypeCtrl = this.formBuilder.control(CandidatesSearchType.LASTNAME);
    this.searchTypeOptions = [
      {value: CandidatesSearchType.LASTNAME, label: "Nom"},
      {value: CandidatesSearchType.FIRSTNAME, label: "Prénom"},
      {value: CandidatesSearchType.COMPANY, label: "Entreprise"}
    ]
  }
}
