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

    addNumberForPayer = (active, number) => {
        this.setState(prevState => {
            const updatedPayers = prevState.payers.map(payer => {
                if (payer.payerId === active.payerId) {
                    return { ...payer, rent: [...payer.rent, number] };
                }
                return payer;
            });
            return { payers: updatedPayers };
        });
        console.log(this.state.payers);
        
    };

    freeNums() {
        const { activePayer } = this.state;
        const free = this.freeNumbersSearching();        
        return free.map((num) => (
            <ForLi freeHotel={num} fnChng={this.changeStatus} fnAddNum={this.addNumberForPayer} actives={activePayer} />
        ));
    }

    chng = () => {
        this.setState({ freeList:!this.state.freeList });
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
                    <div className="col show-info"></div>
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
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <p className="col-md-4 mb-0 text-body"><i class="bi bi-fingerprint"></i> 2024 Nick</p>

                    <div className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto text-decoration-none">
                        <svg style={{ width: 50, height: 50 }} width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#1B1F23"/>
                        </svg>
                    </div>

                    <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Home</a></li>
                    <li className="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Features</a></li>
                    <li className="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Pricing</a></li>
                    <li className="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">FAQs</a></li>
                    <li className="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">About</a></li>
                    </ul>
                </footer>
            </>
        );
    }
}

const mount = document.querySelector('.container');
const root = ReactDOM.createRoot(mount);
root.render(<Component/>);
