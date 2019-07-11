import Logic from '../logic/index';
import DM from './dm'

export default class StructIndex{

    static setup(store){
        this.store = store;

        DM.setup(store);
        Logic.setup(store);
    }

}
