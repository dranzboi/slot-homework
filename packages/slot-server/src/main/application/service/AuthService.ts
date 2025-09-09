import { Account } from "domain/entity/Account";
import {AuthData} from "../dto/AuthData";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

export class AuthService {
    
    constructor(
        @InjectRepository(Account)
     protected readonly accountRepository: Repository<Account>
    ) {}
    async register(context: AuthData) {
        
    }
    async login(context: AuthData) {
        
    }
}