import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm/index';
import SignUpDto from '@v1/auth/dto/sign-up.dto';
import UpdateUserDto from './dto/update-user.dto';
import UserEntity from './schemas/user.entity';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersModel: Repository<UserEntity>,
  ) {}

  public create(user: SignUpDto): Promise<UserEntity> {
    return this.usersModel.save({
      ...user,
      verified: false,
    });
  }

  public async getByEmail(email: string): Promise<UserEntity | null> {
    const user: UserEntity | undefined = await this.usersModel.findOne({
      where: [{
        email
      }],
    });

    return user || null;
  }

  public async getVerifiedUserByEmail(email: string): Promise<UserEntity | null> {
    const user: UserEntity | undefined = await this.usersModel.findOne({
      email,
      verified: true,
    });

    return user || null;
  }

  public async getUnverifiedUserByEmail(email: string): Promise<UserEntity | null> {
    const user: UserEntity | undefined = await this.usersModel.findOne({
      email,
      verified: false,
    });

    return user || null;
  }

  public async getById(id: number): Promise<UserEntity | null> {
    const foundUser: UserEntity | undefined = await this.usersModel.findOne(id);

    return foundUser || null;
  }

  public async getVerifiedUserById(id: number): Promise<UserEntity | null> {
    const foundUser: UserEntity | undefined = await this.usersModel.findOne(id, {
      where: [{ verified: true }],
    });

    return foundUser || null;
  }

  public async getUnverifiedUserById(id: number): Promise<UserEntity | null> {
    const foundUser: UserEntity | undefined = await this.usersModel.findOne(id, {
      where: [{ verified: false }],
    });

    return foundUser || null;
  }

  public updateById(id: number, data: UpdateUserDto): Promise<UpdateResult> {
    return this.usersModel.update(id, data);
  }

  public getAll(): Promise<UserEntity[] | []> {
    return this.usersModel.find();
  }

  public getVerifiedUsers(): Promise<UserEntity[] | []> {
    return this.usersModel.find({
      where: {
        verified: true,
      },
    });
  }
}
