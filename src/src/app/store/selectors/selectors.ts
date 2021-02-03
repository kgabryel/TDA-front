import {key, State} from '../reducers';
import {createFeatureSelector} from '@ngrx/store';

export const selectState = createFeatureSelector<State>(key);
