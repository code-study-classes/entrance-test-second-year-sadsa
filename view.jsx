import React from 'react';
import ReactDOM from 'react-dom/client';
import hotels from './baseHotels';
import { HotelsCards, ForLi, ModalForPayer, ViewPayers, Toaster } from './functions';
import { payers } from './basePersons';

class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels,
            payers,
            inputIdHotel: '',
            inpitIdNumber: '',
            loginUser: {
                loginName: '',
                loginPhoneNumber: '',
                payerType: '',
            },
            freeList: false,
            activePayer: '',
        };
    }

    freeNumbersSearching = () => {
        const { hotels } = this.state;
        const free = hotels.map((item) => {
            return { 
                hotelId: item.hotelId,
                hotelName: item.hotelName,
                region: item.region,
                hotelNumbers: item.hotelNumbers.filter((num) => num.status === 'free')
            }
        });       
        return free;
    }

    changeStatus = (htName, num) => {
        this.setState((prevState) => {
            const updatedHotels = prevState.hotels.map((hotel) => {
                if (hotel.hotelName === htName) {
                    return {
                        ...hotel,
                        hotelNumbers: hotel.hotelNumbers.map((number) => {
                            if (number.hotelNumber === num) {
                                return {
                                    ...number,
                                    status: number.status === 'busy' ? 'free' : 'busy',
                                };
                            }
                            return number;
                        }),
                    };
                }
                return hotel;
            });
            return { hotels: updatedHotels };
        });
    };

    freeNums() {
        const { activePayer } = this.state;
        const free = this.freeNumbersSearching();        
        return free.map((num) => (
            <ForLi freeHotel={num} fn={this.changeStatus} actives={activePayer} />
        ));
    }

    chng = () => {
        this.setState({ freeList:!this.state.freeList });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { loginName, loginPhoneNumber, payerType } = this.state.loginUser;
         
    }

    addPayer = () => {
        const { payers, loginUser } = this.state;
        const { loginName, loginPhoneNumber, payerType } = loginUser;
        const newPayer = {
            payerId: payers.length + 1,
            payerName: loginName,
            payerPhoneNum: loginPhoneNumber,
            payerType,
        };
        this.setState((prevState) => ({
            payers: [...prevState.payers, newPayer],
            loginUser: {
                loginName: '',
                loginPhoneNumber: '',
                payerType: '',
            },
            activePayer: newPayer
        }));        
    }

    setActivity = (active) => {
        this.setState({ activePayer: active })
        console.log(this.state.activePayer);
        
    }

    renderPayers() {
        const { payers } = this.state;
        return (
            <div className="row d-flex justify-content-center">
                {payers.map((person) => (<ViewPayers key={person.payerId} payer={person} fn={this.setActivity} />))}
            </div>
        )
    }

    renderHotels() {
        const { hotels } = this.state;
        return hotels.map((hotel) => (
            <div className="col">
                <HotelsCards key={hotel.hotelId} hotelName={hotel.hotelName} region={hotel.region} numbers={hotel.hotelNumbers} />
            </div>
        ));
    }

    render() {
        const { hotels, freeList, inputNameHotel, inputNumber, loginUser } = this.state;
        const { loginName, loginPhoneNumber, payerType } = loginUser;
        return (
            <>  
                <div className="pt-3">
                    <h2 className="col-12 h2">Отели</h2>
                </div>
                <div className="row hotels mb-5 mt-3">
                    {this.renderHotels()}
                </div>
                <div className="row mb-3">
                    <h2 className="col-12 h2">Инструменты для работы</h2>
                </div>
                <div className="row input">
                    <div className="col-4">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text mb-3" id="inputGroup-sizing-default">Изменить статус</span>
                                <input value={inputNameHotel} onChange={(e) => this.setState({ inputNameHotel: e.target.value })} type="text" className="form-control" aria-label="Default" placeholder="Название отеля" aria-describedby="inputGroup-sizing-default" />
                                <input value={inputNumber} onChange={(e) => this.setState({ inputNumber: e.target.value })} type="text" className="form-control mb-3" aria-label="Default" placeholder="Номер" aria-describedby="inputGroup-sizing-default" />
                                <button onClick={() => this.changeStatus(inputNameHotel, inputNumber)} className="btn btn-danger">Изменить</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <button onClick={this.chng} className="btn btn-primary">{freeList ? 'Скрыть список' : 'Посмотреть свободные номера'}</button>
                    </div>
                    <div className="col-3">
                       {freeList ? this.freeNums() : null} 
                    </div>
                </div>
                <div className="row">
                    <h2 className="h2">Бронирование номера</h2>
                </div>
                <div className="row">
                    <form className="col-4">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="bg-danger bg-gradient input-group-text" id="basic-addon1"><i class="bi bi-person-add"></i></span>
                            </div>
                            <input value={loginName} onChange={(e) => this.setState({ loginUser: { loginName: e.target.value, loginPhoneNumber, payerType } })} type="text" class="form-control" placeholder="ФИО" aria-label="Username" aria-describedby="basic-addon1" required />
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="bg-primary bg-gradient input-group-text" id="basic-addon1"><i class="bi bi-phone"></i></span>
                            </div>
                            <input value={loginPhoneNumber} onChange={(e) => this.setState({ loginUser: { loginName, loginPhoneNumber: e.target.value, payerType } })} type="text" class="form-control" placeholder="+7ххх-ххх-хх-хх" aria-label="Phonenumber" aria-describedby="basic-addon1" required />
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="bg-success bg-gradient input-group-text" id="basic-addon1"><i class="bi bi-file-text"></i></span>
                            </div>
                            <input value={payerType} onChange={(e) => this.setState({ loginUser: { loginName, loginPhoneNumber, payerType: e.target.value } })} type="text" class="form-control" placeholder="Вид плательщика" aria-label="Typeofpayer" aria-describedby="basic-addon1" required />
                        </div>
                        {<ModalForPayer name={loginName} phone={loginPhoneNumber} type={payerType} fn={this.addPayer} />}
                    </form>
                    {this.renderPayers()}
                </div>
            </>
        );
    }
}

const mount = document.querySelector('.container');
const root = ReactDOM.createRoot(mount);
root.render(<Component/>);
