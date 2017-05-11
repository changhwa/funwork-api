import {Table, Column, Model, PrimaryKey, Default} from "sequelize-typescript";

@Table
export default class Payment extends Model<Payment> {

  //일련번호
  @Column({primaryKey: true})
  seq: number;

  //기안자ID
  @Column
  drafterId: string;

  //부서코드
  @Column
  dept: string;

  //등록일
  @Column
  writeDate: string;

  //수정일
  @Column
  updateDate: string;

  //문서번호
  @Column
  documentNo: string;

  //상태코드
  //@Default({value: 'A'})
  @Column
  status: string;
}