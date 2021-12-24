<template>
    <section class="header">
        <div class="header__wrapper">
            <div class="header--left">
                Collaborative coding 
            </div>
            <div class="header--right">
                <div class="btn-share">Share+</div>
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

.btn-share {
    border: 0;
    padding: 0.3em;
    background-color: #2f7ae5;
    border-radius: 5px;
    width: 100px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
    color: white;
}
</style>