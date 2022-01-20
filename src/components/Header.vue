<template>
    <section class="header">
        <div class="header__wrapper">
            <div class="header--left">
                Collaborative coding 
            </div>
            <div class="header--right">
                <button type="button" class="btn btn-primary">Share +</button>
                <div class="avatar"></div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: center;
    background: #444859;
}

.header__wrapper {
    display: flex;
    justify-content: space-between;
    height: 60px;
    width: 90%;
}

.header--left {
    font-family: 'Courier New', Courier, monospace;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
}

.header--right {
    display: flex;
    text-align: center;
    align-items: center;
}
</style>