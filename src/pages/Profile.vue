<template>
    <div>
        <Profile :profile="profile" />
    </div>
</template>

<script>
    let profile = {
        "id": 100,
        "first_name": "Сусова",
        "last_name": "Марина",
        "middle_name": "M",
        "phone": 79661933658,
        "date_of_birth": "1998-03-29 11:39:16"
    };

    export default {
        data() {
            return {
                profile,
            };
        },
    };
</script>
