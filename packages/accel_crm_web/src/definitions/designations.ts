import * as moment from 'moment';
import { find } from 'lodash';

import Designation from '../payloads/designation';

const noAvatar = require('../assets/user-male.png');

class designation {
    title: string;
    description: string;
    id: string;

    constructor(desg: Designation) {
        this.title = desg.title;
        this.description = desg.description;
        this.id = desg.id;
    }
}

export default designation;
