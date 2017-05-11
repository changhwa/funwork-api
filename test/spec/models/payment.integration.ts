import {expect} from "chai";
import {sequelize} from "../../../src/models/index";
import Payment from "../../../src/models/domain/payment";

describe("[Integration] 전자결재를 테스트한다", () => {

  before((done: Function) => {
    sequelize.sync().then(() => {
      done();
    }).catch((error: Error) => {
      done(error);
    });
  });

  it('결재를 등록', (done: Function) => {
    const payment = new Payment({seq:'1', drafterId: 'test', dept: '', writeDate: '2017-05-11', documentNo: 'document01', status: 'A'});
    payment.save().then(test => {
      Payment.findAll<Payment>().then(patmentList => {
        expect(test.drafterId).to.be.eql(patmentList[0].drafterId);
        done();
      });
    });
  });

  it('결재를 수정', (done: Function) => {
    const payment = new Payment({seq:'2', drafterId: 'test', dept: '', writeDate: '2017-05-11', documentNo: 'document01', status: 'A'});
    payment.setDataValue('updateDate','2017-05-12');
    payment.save().then(test => {
      Payment.findAll<Payment>().then(patmentList => {
        expect(test.updateDate).to.be.eql('2017-05-12');
        done();
      });
    });
  });

  it('결재를 삭제', (done: Function) => {
    const payment = new Payment({seq:'3', drafterId: 'test', dept: '', writeDate: '2017-05-11', documentNo: 'document01', status: 'A'});
    payment.setDataValue('status','D');
    payment.save().then(test => {
      Payment.findAll<Payment>().then(patmentList => {
        expect(test.status).to.be.eql('D');
        done();
      });
    });
  });


});