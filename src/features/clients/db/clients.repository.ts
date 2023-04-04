import { Repository } from 'typeorm';
import { Client } from '../domain/entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../core/db/base.repository';

@Injectable()
export class ClientsRepository implements BaseRepository<Client> {
  constructor(
    @InjectRepository(Client)
    private ormRepo: Repository<Client>,
  ) {}

  async getById(id: string) {
    const entity = await this.ormRepo.findOneBy({ id: id });
    return entity;
  }

  async save(entity: Client) {
    await this.ormRepo.save(entity);
  }

  async delete(id: string) {
    await this.ormRepo.delete(id);
  }
}
