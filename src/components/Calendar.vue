<template>
	<div class="calendar">
		<div class="calendar__left">
			<div class="calendar__bar">
				<button :disabled="!allowPrevMonth" class="calendar__bar__arrow" v-on:click="decrementCurrentMonth()">
					<svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.19861 4.67596L6.43347 1.07699C7.09697 0.620831 8 1.09585 8 1.90103V9.09897C8 9.90415 7.09697 10.3792 6.43347 9.92301L1.19861 6.32404C0.620645 5.92669 0.620644 5.07331 1.19861 4.67596Z" fill="#70C9B9"/>
					</svg>                        
				</button>
				<span class="calendar__bar__center">
					{{ nameCurrentMonth }}
					{{ currentYear }}
				</span>
				<button :disabled="!allowNextMonth" class="calendar__bar__arrow" v-on:click="incrementCurrentMonth()">
					<svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M6.80139 4.67596L1.56653 1.07699C0.903027 0.620831 0 1.09585 0 1.90103V9.09897C0 9.90415 0.903026 10.3792 1.56653 9.92301L6.80139 6.32404C7.37936 5.92669 7.37936 5.07331 6.80139 4.67596Z" fill="#70C9B9"/>
					</svg>                        
				</button>
			</div>
			<div class="calendar__week-names">
				<span v-for="nameOfDayWeek in namesOfDayWeek" class="calendar__week-names__name">{{nameOfDayWeek}}</span>
			</div>
			<div class="calendar__days">
				<button v-for="indentEmptyBeforeDay in indentEmptyBeforeDays" class="calendar__days__day"></button>
				<button 
					v-for="(day, index) in daysByCurrentYearAndMonth"
					v-bind:class="{ calendar__days__day_active: currentDay == index+1, calendar__days__day_exist: !day['empty'] }"
					class="calendar__days__day"
					v-on:click="changeCurrentDay(day.date.split('-')[2])"
				>
					<span>{{index+1}}</span> 
				</button>
				<button v-for="indentEmptyAfterDay in indentEmptyAfterDays" class="calendar__days__day"></button>
			</div>
		</div>
		<div class="calendar__right">
			<div v-if="!daysByCurrentYearAndMonth[currentDay-1].empty" class="calendar__info">
				<p class="calendar__info__headline">Записи</p>
				<div
					v-for="dayByCurrentYearAndMonth in daysByCurrentYearAndMonth"
					v-if="+dayByCurrentYearAndMonth.date.split('-')[2] == currentDay" 
					class="calendar__visits"

				>
					<div class="calendar__visits__visit" v-for="slot in dayByCurrentYearAndMonth.slots">
						<div class="calendar__visits__visit__left">
							<div class="calendar__visits__visit__type">{{slot.type}}</div>
							<div class="calendar__visits__visit__name">{{slot.doctor_name}}, {{slot.doctor_specialisation}}</div>
						</div>
						<div class="calendar__visits__visit__time">{{slot.hours}}</div>
					</div>
				</div>
			</div>
			<div v-if="daysByCurrentYearAndMonth[currentDay-1].empty" class="calendar__empty-day">На выбранный день ничего<br> не запланированно</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['days'],
		data: function() {
			return {
				// Получим текущий год
				currentYear: new Date().getFullYear(),
				// Получим текущий месяц
				currentMonth: new Date().getMonth() + 1, // Месяца начинаются с 0,
				// Получим текущий день
				currentDay: new Date().getDate(),

				// Имя месяца на русском для отбображения в баре календаря
				nameCurrentMonth: '',

				// Оступ пустых дней вначале месяца
				indentEmptyBeforeDays: [],
				// Оступ пустых дней вконце месяца
				indentEmptyAfterDays: [],

				// Дни из всех дней с учетом текущих дат
				daysByCurrentYearAndMonth: [],

				namesOfDayWeek: ["Пн", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],

				// Разрешено ли показывать предыдущий месяц
				allowPrevMonth: false,
				// Разрешено ли показывать следующий месяц
				allowNextMonth: false,
			}
		},
		created: function() {
			this.selectDaysByСurrentYearAndMonth()
		},
		methods: {
			changeCurrentDay: function(day) {
				this.currentDay = day;
			},
			incrementCurrentMonth: function(event) {
				// Если месяц первый при изменении месяца на -1, то уменьшаем год -1 и устанавливаем месяц = 12
				if (this.currentMonth == 12) {
					this.currentMonth = 1;
					this.currentYear += 1;
				} else { // В противном случае просто увеличиваем месяц +1
					this.currentMonth += 1;
				}

				// Изменим текущий день на 1
				this.currentDay = 1;

				// Выберем по новой дни в зависимости от текущего года и месяца
				this.selectDaysByСurrentYearAndMonth()
			},
			decrementCurrentMonth: function(event) {
				// Если месяц первый при изменении месяца на -1, то уменьшаем год -1 и устанавливаем месяц = 12
				if (this.currentMonth == 1) {
					this.currentMonth = 12;
					this.currentYear -= 1;
				} else { // В противном случае просто уменьшаем месяц -1
					this.currentMonth -= 1;
				}
				
				// Изменим текущий день на 1
				this.currentDay = 1;

				// Выберем по новой дни в зависимости от текущего года и месяца
				this.selectDaysByСurrentYearAndMonth()
			},
			// Получаем количество дней в месяце по месяцу и году
			daysInMonth: function daysInMonth (month, year) {
					return new Date(year, month, 0).getDate();
			},
			// Выбираем из всех дней дни относящиеся к текущему году и месяцу
			selectDaysByСurrentYearAndMonth: function(event) {
				const daysInCurrentMonth = this.daysInMonth(this.currentMonth, this.currentYear)
				// Запишем массив с количеством дней в текущем месяце
				var daysByCurrentYearAndMonth = new Array(daysInCurrentMonth);
				for (let i = 0; i < this.days.length; i++) {
					const day = this.days[i];
					if (
						+day.date.split('-')[0] == this.currentYear &&
						+day.date.split('-')[1] == this.currentMonth
						) {
							// Запишем день в массив месяца по его дню
							daysByCurrentYearAndMonth[day.date.split('-')[2]-1] = day;
					}
				}
				
				// Перезапишем пустые дни в созданном массиве месяца
				for (let i = 0; i < daysByCurrentYearAndMonth.length; i++) {
					if (typeof daysByCurrentYearAndMonth[i] == "undefined") {
						daysByCurrentYearAndMonth[i] = {};
						daysByCurrentYearAndMonth[i].empty = true;
						// Запишем дату пустого дня для отображения
						daysByCurrentYearAndMonth[i].date = `${this.currentYear}-${this.currentMonth}-${i+1}`;
					}
				}
				
				// Перезапишем дни из текущего месяца
				this.daysByCurrentYearAndMonth = daysByCurrentYearAndMonth;
				
				// Получим количество дней предыдущего месяца и следующего месяца
				let firstDayOfMonth = new Date(`${this.currentYear}/${this.currentMonth}/1`).toString().split(" ")[0];
				let lastDayOfMonth = new Date(`${this.currentYear}/${this.currentMonth}/${this.daysInMonth(this.currentMonth, this.currentYear)}`).toString().split(" ")[0];
				switch (firstDayOfMonth) {
					case 'Mon': {
						this.indentEmptyBeforeDays = new Array(0)
						break;
					}
					case 'Tue': {
						this.indentEmptyBeforeDays = new Array(1)
						break;
					}
					case 'Wed': {
						this.indentEmptyBeforeDays = new Array(2)
						break;
					}
					case 'Thu': {
						this.indentEmptyBeforeDays = new Array(3)
						break;
					}
					case 'Fri': {
						this.indentEmptyBeforeDays = new Array(4)
						break;
					}
					case 'Sat': {
						this.indentEmptyBeforeDays = new Array(5)
						break;
					}
					case 'Sun': {
						this.indentEmptyBeforeDays = new Array(6)
						break;
					}
					default: {
						break;
					}
				}
				switch (lastDayOfMonth) {
					case 'Mon': {
						this.indentEmptyAfterDays = new Array(6)
						break;
					}
					case 'Tue': {
						this.indentEmptyAfterDays = new Array(5)
						break;
					}
					case 'Wed': {
						this.indentEmptyAfterDays = new Array(4)
						break;
					}
					case 'Thu': {
						this.indentEmptyAfterDays = new Array(3)
						break;
					}
					case 'Fri': {
						this.indentEmptyAfterDays = new Array(2)
						break;
					}
					case 'Sat': {
						this.indentEmptyAfterDays = new Array(1)
						break;
					}
					case 'Sun': {
						this.indentEmptyAfterDays = new Array(0)
						break;
					}
					default: {
						break;
					}
				}

				// Запишем имя месяца на русском языке
				let shortNameMonthEnglish = new Date(`${this.currentYear}/${this.currentMonth}/1`).toString().split(" ")[1];
				switch (shortNameMonthEnglish) {
					case 'Jan': {
						this.nameCurrentMonth = 'Январь'
						break;
					}
					case 'Feb': {
						this.nameCurrentMonth = 'Февраль'
						break;
					}
					case 'Mar': {
						this.nameCurrentMonth = 'Март'
						break;
					}
					case 'Apr': {
						this.nameCurrentMonth = 'Апрель'
						break;
					}
					case 'May': {
						this.nameCurrentMonth = 'Май'
						break;
					}
					case 'Jun': {
						this.nameCurrentMonth = 'Июнь'
						break;
					}
					case 'Jul': {
						this.nameCurrentMonth = 'Июль'
						break;
					}
					case 'Aug': {
						this.nameCurrentMonth = 'Август'
						break;
					}
					case 'Sep': {
						this.nameCurrentMonth = 'Сентябрь'
						break;
					}
					case 'Oct': {
						this.nameCurrentMonth = 'Октябрь'
						break;
					}
					case 'Nov': {
						this.nameCurrentMonth = 'Ноябрь'
						break;
					}
					case 'Dec': {
						this.nameCurrentMonth = 'Декабрь'
						break;
					}
					default: {
						break;
					}
				}

				// Определим можно ли переходить на предыдущий и следующий месяц
				var firstDateOfAllDays = new Date(`${this.days[0].date.split("-")[0]}/${this.days[0].date.split("-")[1]}/1`);
				var currentMonthDate = new Date(`${this.currentYear}/${this.currentMonth}/1`);
				var lastDateOfAllDays = new Date(`${this.days[this.days.length - 1].date.split("-")[0]}/${this.days[this.days.length - 1].date.split("-")[1]}/1`);
				if (currentMonthDate > firstDateOfAllDays) {
					this.allowPrevMonth = true;
				} else {
					this.allowPrevMonth = false;
				}
				if (lastDateOfAllDays > currentMonthDate) {
					this.allowNextMonth = true;
				} else {
					this.allowNextMonth = false;
				}
			}
		}
	}
</script>

 <style>
        .calendar {
            display: flex;
            align-items: stretch;
            align-content: stretch;
            justify-content: flex-start;
            flex-wrap: wrap;
            width: 1125px;
            max-width: 100%;
            background: #FFFFFF;
            box-shadow: 0px 10px 23px -6px rgba(5, 80, 66, 0.09);
            border-radius: 10px;
        }

		.calendar * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
		}

        .calendar__left {
            width: 67%;
            padding: 14px 27px;
            border-right: 1px solid #E8EEED;
        }

        .calendar__right {
            width: 33%;
            display: flex;
            align-items: stretch;
            align-content: stretch;
            justify-content: flex-start;
            min-height: 200px;
        }

        .calendar__bar {
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: space-between;
            margin: 0 -15px 18px -15px;
        }
        .calendar__bar__center {
            font-size: 20px;
            font-weight: 500;
            color: #373A3C;
        }
        .calendar__bar__arrow {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
            border: none;
            background-color: transparent;
            outline: none;
            cursor: pointer;
        }
        .calendar__bar__arrow:disabled svg path {
            fill: #E8EEED
        }

        .calendar__week-names {
            display: flex;
            align-items: stretch;
            align-content: stretch;
            justify-content: flex-start;
            margin: 0 0 16px 0;
        }
        .calendar__week-names__name {
            width: 14.25%;
            text-align: center;
            color: #8D8D8D;
            font-size: 12px;
        }

        .calendar__days {
            display: flex;
            align-items: stretch;
            align-content: stretch;
            justify-content: flex-start;
            flex-wrap: wrap;
        }
        .calendar__days__day {
            width: 14.25%;
            height: 67px;
            border: 1px solid #E8EEED;
            font-size: 16px;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
            color: #373A3C;
            background-color: transparent;
            outline: none;
            cursor: pointer;
            transition: 0.3s;
        }
        .calendar__days__day:hover {
            background-color: #eee;
            color: #373A3C;
            border: 1px solid #eee;
        }
        .calendar__days__day_exist {
            background-color: #E8EEED;
            color: #B9C1C0;
        }
        .calendar__days__day_active:hover,
        .calendar__days__day_active {
            background: #70C9B9;
            color: #fff;
            border: 1px solid #70C9B9;
        }
        
        .calendar__info {
            width: 100%;
        }
        .calendar__info__headline {
            padding: 22px 30px;
            font-size: 20px;
            font-weight: 500;
        }

        .calendar__empty-day {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
            text-align: center;
            color: #2C3E46;
            opacity: 0.5;
        }

        .calendar__visits__visit {
            display: flex;
            align-items: flex-start;
            align-content: flex-start;
            justify-content: space-between;
            padding: 16px 36px 16px 30px;
            border-top: 1px solid #E8EEED;
        }
        .calendar__visits__visit__type {
            font-size: 16px;
            font-weight: 500;
            margin: 0 0 5px 0;
        }
        .calendar__visits__visit__name {
            font-size: 14px;
            font-weight: 500;
            color: #2C3E46;
            opacity: 0.6;
        }
        .calendar__visits__visit__time {
            font-weight: 500;
            font-size: 18px;
            color: #37BDA5;
            margin: 0 0 0 15px;
        }

        @media (max-width: 1000px) {
            .calendar__left {
                width: 100%;
                padding: 10px;
                border-bottom: 1px solid #E8EEED;
                border-right: none;
            }
            .calendar__right {
                width: 100%;
            }
            .calendar__info__headline {
                padding: 15px;
            }
            .calendar__visits__visit {
                padding: 10px 15px;
            }
        }
    </style>