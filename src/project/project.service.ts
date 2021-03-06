import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository:Repository<Project>,
  ) {}

  create(createProjectInput: CreateProjectInput) {
    let project = this.projectRepository.create(createProjectInput);
    return this.projectRepository.save(project);
  }

  findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations:["employees","employees.categories"]
    });
  }

  findOne(id: number): Promise<Project> {
    return this.projectRepository.findOne(id,{
      relations:["employees"]
    });
  }

  
  async update(id: string, updateProjectInput: UpdateCategoryInput):Promise<any> {
    return await this.projectRepository.findByIdAndUpdate(id,updateProjectInput,{new:true})
  }

 async remove(_id: string):Promise<any> {
    return await this.projectRepository.findByIdAndRemove(_id);
  }
}
