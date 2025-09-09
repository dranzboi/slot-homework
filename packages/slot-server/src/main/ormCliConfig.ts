import {Config} from './Config';
import {DataSource} from "typeorm";

export default new DataSource(Config.db as any);