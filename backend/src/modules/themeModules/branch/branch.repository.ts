import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Branch } from '@branch/entities/branch.entity';

@Injectable()
export class BranchRepository extends Repository<Branch> {
  constructor(private dataSource: DataSource) {
    super(Branch, dataSource.createEntityManager());
  }

  async existsBranchById(branchId: number): Promise<boolean> {
    const branch = await this.findOneBy({ id: branchId });
    return !!branch;
  }
}
