import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tasks')
export class TaskOrmEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    isCompleted: boolean;
}