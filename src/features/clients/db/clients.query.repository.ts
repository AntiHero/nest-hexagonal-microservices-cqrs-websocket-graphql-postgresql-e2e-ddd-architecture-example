import { Repository } from 'typeorm';
import { Client } from '../domain/entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class ClientsQueryRepository {
  constructor(
    @InjectRepository(Client)
    private ormRepo: Repository<Client>,
  ) {}

  async getAll(): Promise<ClientViewModel[]> {
    const clients = await this.ormRepo.find({});
    return clients.map(ClientsQueryRepository.mapClientEntityToClientViewModel);
  }

  async getById(id: string): Promise<ClientViewModel> {
    const entity = await this.ormRepo.findOneBy({
      id: id,
    });
    return ClientsQueryRepository.mapClientEntityToClientViewModel(entity);
  }

  static mapClientEntityToClientViewModel(client: Client): ClientViewModel {
    return {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
    };
  }
}

export class ClientViewModel {
  @ApiProperty()
  id: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
}