import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
    ShowBusyIndicator,
    HideBusyIndicator,
    SetIsUserLogedIn
} from '../actions/global.actions';
import { Injectable } from '@angular/core';

export class GlobalStateModel {
    isLoading: boolean;
    currentTask: string;
    IsUserLogedIn: boolean;
}

const defaultState = {
    isLoading: false,
    currentTask: '',
    IsUserLogedIn: false,
};

@State<GlobalStateModel>({
    name: 'globalState',
    defaults: defaultState,

})
@Injectable()
export class GlobalState {
    @Selector()
    public static isLoading(state: GlobalStateModel) {
        return state.isLoading;
    }
    @Selector()
    public static currentTask(state: GlobalStateModel) {
        return state.currentTask;
    }
    @Selector() public static GetIsUserLogedIn(state: GlobalStateModel) {
        return state.IsUserLogedIn;
    }

    @Action(ShowBusyIndicator)
    showBusyIndicator({ patchState }: StateContext<GlobalStateModel>, { currentTask }: ShowBusyIndicator) {
        patchState({
            isLoading: true,
            currentTask
        });
    }

    @Action(HideBusyIndicator)
    hideBusyIndicator({ patchState }: StateContext<GlobalStateModel>, { currentTask }: HideBusyIndicator) {
        patchState({
            isLoading: false,
            currentTask
        });
    }
    @Action(SetIsUserLogedIn) SetoeAccessIsChanged({ patchState }: StateContext<GlobalStateModel>, { IsUserLogedIn }: SetIsUserLogedIn) {
        patchState({ IsUserLogedIn });
    }
}
