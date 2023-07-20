// src/user.service.ts
/*
import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

// Define the CommandObject interface
interface CommandObject {
  type: string;
  cmd: string;
}

interface RequestBody {
  type: string;
  cmd_chain: CommandObject[];
}

@Injectable()
export class UserService {
  private pool: Pool;

  constructor() {
    // Initialize the PostgreSQL pool
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'orchestrator',
      password: 'postgres',
      port: 5434,
    });
  }

  async addMultipleUsers(requestBody: RequestBody): Promise<any> {
    console.log('requestBody:', requestBody);
    // const commands = requestBody.cmd_chain.map((cmdObj) => cmdObj.cmd);
    const commands: string[] = requestBody.cmd_chain.map(
      (cmdObj: CommandObject) => cmdObj.cmd,
    );

    console.log('commands:', commands);

    let dbStateBeforeTransaction;
    try {
      // Start the transaction
      await this.pool.query('BEGIN');

      // Get the database state before executing the commands
      const dbStateQuery = 'SELECT * FROM "Users";';
      console.log('dbStateQuery:', dbStateQuery);
      const dbStateResult = await this.pool.query(dbStateQuery);
      dbStateBeforeTransaction = dbStateResult.rows;

      // Execute the commands inside the transaction
      for (const cmd of commands) {
        console.log('cmd:', cmd);
        await this.pool.query(cmd);
      }

      // Commit the transaction
      await this.pool.query('COMMIT');

      // Get the final database state after the transaction
      const dbStateQueryAfter = 'SELECT * FROM "Users";';
      const dbStateResultAfter = await this.pool.query(dbStateQueryAfter);
      const dbStateAfterTransaction = dbStateResultAfter.rows;

      return {
        status: 'ok',
        dbState: dbStateAfterTransaction,
      };
    } catch (error) {
      // If there is an error, rollback the transaction to revert the changes
      await this.pool.query('ROLLBACK');

      return {
        status: 'error',
        dbState: dbStateBeforeTransaction,
      };
    }
  }
}
*/

// src/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async addMultipleUsers(
    commands: string[],
  ): Promise<{ status: string; dbState: string[] }> {
    const dbState: string[] = [];
    let status = 'ok';

    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      for (const cmd of commands) {
        const result = await queryRunner.manager.query(cmd);
        if (result.length > 0) {
          dbState.push(result[0]);
        }
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      status = 'error';
      await queryRunner.rollbackTransaction();
      console.error('Error during transaction:', error.message);
    } finally {
      await queryRunner.release();
    }

    return { status, dbState };
  }
}

/*
  async addMultipleUsers(commands: string[]): Promise<{ status: string; dbState: string[] }> {
    const dbState: string[] = [];
    let isSuccess = true;

    // Start the transaction
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();

    for (const cmd of commands) {
      try {
        const result = await this.userRepository.query(cmd);
        await queryRunner.manager.save(result);
        if (result.length > 0) {
          dbState.push(result[0]);
        }
        await queryRunner.commitTransaction();
      } catch (error) {
        isSuccess = false;
        await queryRunner.rollbackTransaction();
        // console.error('Error executing SQL command:', cmd);
        // console.error('Error message:', error.message);
        // await this.revertChanges(dbState);
        // return { status: 'error', dbState };
      } finally {
        await queryRunner.release();
      }
    }
    return {
      status: isSuccess ? 'ok' : 'error',
      dbState: dbState,
    };
  }

  private formatUser(user: User): string {
    return `(${user.Uid}, '${user.Username}', '${user.City}', ${
      user.Friend === null ? 'NULL' : user.Friend
    })`;
  }

  async revertChanges(dbState: string[]): Promise<void> {
    // Implement the logic to revert changes based on the dbState
    // For simplicity, we'll just delete the added users in this example
    for (const state of dbState) {
      try {
        const uid = state.match(/Uid (\d+)/)[1];
        await this.userRepository.delete(uid);
      } catch (error) {
        console.error('Error reverting change for state:', state);
        console.error('Error message:', error.message);
      }
    }
  }

}
*/
