<template>
    <div>
        <Calendar :days="days" />
    </div>
</template>

<script>
    let days = [
        {
            "date": "2021-01-10",
            "slots": [
                {
                    "slot_id": null,
                    "hours": "16:45",
                    "start_time": "2021-03-13 16:45:00",
                    "end_time": "2021-03-13 17:30:00",
                    "doctor_name": "Анна Васильевна",
                    "doctor_specialisation": "рентгенолог",
                    "type": "Первичный онлайн прием",
                },
            ]
        },
        {
            "date": "2021-03-13",
            "slots": [
                {
                    "slot_id": null,
                    "hours": "16:45",
                    "start_time": "2021-03-13 16:45:00",
                    "end_time": "2021-03-13 17:30:00",
                    "doctor_name": "Игорь Петрович",
                    "doctor_specialisation": "терапевт",
                    "type": "Повторный онлайн прием",
                },
                {
                    "slot_id": null,
                    "hours": "17:30",
                    "start_time": "2021-03-13 17:30:00",
                    "end_time": "2021-03-13 18:15:00",
                    "doctor_name": "Мария Викторовна",
                    "doctor_specialisation": "гастроэнтеролог",
                    "type": "Повторный онлайн прием",
                },
            ]
        },
        {
            "date": "2021-03-21",
            "slots": [
                {
                    "slot_id": null,
                    "hours": "16:45",
                    "start_time": "2021-03-13 16:45:00",
                    "end_time": "2021-03-13 17:30:00",
                    "doctor_name": "Анна Васильевна",
                    "doctor_specialisation": "рентгенолог",
                    "type": "Первичный онлайн прием",
                },
            ]
        },
        {
            "date": "2021-04-1",
            "slots": [
                {
                    "slot_id": null,
                    "hours": "16:45",
                    "start_time": "2021-03-13 16:45:00",
                    "end_time": "2021-03-13 17:30:00",
                    "doctor_name": "Анна Васильевна",
                    "doctor_specialisation": "рентгенолог",
                    "type": "Первичный онлайн прием",
                },
            ]
        },
    ];

    export default {
        data() {
            return {
                days,
            };
        },
    };
</script>
