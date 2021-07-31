import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeInput: CreateEmployeeInput): Promise<Employee> {
    let emp = this.employeeRepository.create(createEmployeeInput);
    return this.employeeRepository.save(emp);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({
      relations:["categories"]
    });
  }

  findOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOneOrFail(id);
  }

 async update(
    id: number,
    updateEmployeeInput: UpdateEmployeeInput,
  ): Promise<Employee> {
    //await this.employeeRepository.update(id, updateEmployeeInput);
    await this.employeeRepository.save(updateEmployeeInput)
    return this.employeeRepository.findOneOrFail(id);
  }

  async remove(id: number) {
    await this.employeeRepository.delete(id);
  }
}
