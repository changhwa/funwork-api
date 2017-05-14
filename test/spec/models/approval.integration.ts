import {expect} from "chai";
import {sequelize} from "../../../src/models/index";
import Approval from "../../../src/models/domain/approval";

describe("[Integration] 전자결재를 테스트한다", () => {

  before((done: Function) => {
    sequelize.sync().then(() => {
      done();
    }).catch((error: Error) => {
      done(error);
    });
  });

  it('결재를 등록', (done: Function) => {
    const approval = new Approval({seq:'1', drafterId: 'test', dept: '', writeDate: '2017-05-11', documentNo: 'document01', status: 'A'});
    approval.save().then(test => {
      Approval.findAll<Approval>().then(approvalList => {
        expect(test.drafterId).to.be.eql(approvalList[0].drafterId);
        done();
      });
    });
  });

  it('결재를 수정', (done: Function) => {
    const approval = new Approval({seq:'2', drafterId: 'test', dept: '', writeDate: '2017-05-11', documentNo: 'document01', status: 'A'});
    approval.setDataValue('updateDate','2017-05-12');
    approval.save().then(test => {
      Approval.findAll<Approval>().then(approvalList => {
        expect(test.updateDate).to.be.eql('2017-05-12');
        done();
      });
    });
  });

  it('결재를 삭제', (done: Function) => {
    const approval = new Approval({seq:'3', drafterId: 'test', dept: '', writeDate: '2017-05-11', documentNo: 'document01', status: 'A'});
    approval.setDataValue('status','D');
    approval.save().then(test => {
      Approval.findAll<Approval>().then(approvalList => {
        expect(test.status).to.be.eql('D');
        done();
      });
    });
  });


});