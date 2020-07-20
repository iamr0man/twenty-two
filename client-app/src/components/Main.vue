<template>
  <main class="main">
    <div class="main__welcome">
      Welcome,
      <p>Monica</p>
    </div>
    <div class="main__infographic">
      <div class="main__relationship">
        <div class="relationship__layout"></div>
        <div class="relashionship__label">Current situation</div>
        <div class="relationship__line">
          <div class="line__item red"></div>
          <div class="line__item violet"></div>
          <div class="line__item black"></div>
          <div class="line__item yellow"></div>
          <div class="line__item gray"></div>
        </div>
        <div class="relationship__items">
          <div class="relationship__item">
            <div class="item__name">testing</div>
            <div class="item__details">
              <div class="item__amount">100</div>
              |
              <div class="item__percentage">20%</div>
            </div>
          </div>
          <div class="relationship__item">
            <div class="item__name">testing</div>
            <div class="item__details">
              <div class="item__amount">100</div>
              |
              <div class="item__percentage">20%</div>
            </div>
          </div>
          <div class="relationship__item">
            <div class="item__name">testing</div>
            <div class="item__details">
              <div class="item__amount">100</div>
              |
              <div class="item__percentage">20%</div>
            </div>
          </div>
          <div class="relationship__item">
            <div class="item__name">testing</div>
            <div class="item__details">
              <div class="item__amount">100</div>
              |
              <div class="item__percentage">20%</div>
            </div>
          </div>
          <div class="relationship__item">
            <div class="item__name">testing</div>
            <div class="item__details">
              <div class="item__amount">100</div>
              |
              <div class="item__percentage">20%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="main__rating">
        <v-sparkline
          :value="value"
          :labels="labels"
          padding="16"
          :gradient="gradient"
          line-width="10"
          type="bar"
          auto-draw
          :auto-line-width="true"
        ></v-sparkline>
      </div>
    </div>
    <div class="main__navigation">
      <div class="navigation__item">
        <img src="../assets/images/task.png" alt="" class="item__logo" />
        <div class="item__value">
          <router-link class="router-link" to="/manager">manager</router-link>
        </div>
        <div class="item__additional">
          954
          <p>completed tasks</p>
        </div>
      </div>
      <div class="navigation__item">
        <img src="../assets/images/passion.svg" alt="" class="item__logo" />
        <div class="item__value">
          <router-link class="router-link" to="/passion">passion</router-link>
        </div>
        <div class="item__additional">
          89
          <p>notes</p>
        </div>
      </div>
      <div class="navigation__item">
        <img src="../assets/images/budget.svg" alt="" class="item__logo" />
        <div class="item__value">budget</div>
        <div class="item__additional">
          324
          <p>transactions</p>
        </div>
      </div>
      <div class="navigation__item">
        <img src="../assets/images/global.svg" alt="" class="item__logo" />
        <div class="item__value">language</div>
        <div class="item__additional">
          501
          <p>words was added</p>
        </div>
      </div>
    </div>
    <div class="main__layout"></div>
    <div class="main__circle main__circle-top"></div>
    <div class="main__circle main__circle-bottom"></div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      value: [0, 5, 7, 1, -2, 4, 10],
      labels: ["MON", "TUES", "WED", "THUR", "FRI", "SAT", "SUN"],
      gradient: ["#00c6ff", "#F0F", "#FF0"]
    };
  }
};
</script>

<style lang="scss">
.main {
  width: 80%;
  margin: 0 auto;
  background: #ecf0f3;
  border-radius: 130px;
  height: calc(100% - 68px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__welcome {
    font-size: 50px;
    text-align: left;
    padding: 15px 10px;
    font-weight: 500;

    p {
      font-weight: 700;
    }
  }

  &__infographic {
    .main__relationship {
      display: none;
    }

    .main__rating {
      display: block;
    }
  }

  &__navigation {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .navigation__item {
      flex: 0 1 50%;
      .item__logo {
        width: 35px;
      }

      .item__value {
        text-transform: uppercase;
        font-weight: 900;

        .router-link {
          color: #1b1b1b;
          text-decoration: none;
        }
      }

      .item__additional {
        font-family: "Montserrat Subrayada", sans-serif;
      }
    }
  }

  &__layout {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #b6b6d3;
    z-index: -2;
  }
  &__circle {
    position: absolute;
    top: -290px;
    left: -300px;
    width: 1000px;
    height: 1000px;
    border-radius: 50%;
    z-index: -1;

    &-top {
      background-color: #c7eff9;
    }
    &-bottom {
      background-color: #e3cdda;
      top: 275px;
      left: 1585px;
    }
  }

  /* 
      ##Device = Laptops, Desktops
      ##Screen = B/w 1025px to 1280px
    */
  @media screen and (min-width: 1025px) {
    &__infographic {
      display: flex;
      justify-content: space-evenly;
      .main__relationship {
        position: relative;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        width: 20%;
        max-height: 260px;
        border-radius: 20px;
        padding: 10px;
        background: #f0f0f3;
        box-shadow: inset -10px -10px 10px 0 #ffffffb8,
          inset 10px 10px 10px 0 #aeaec054;
        z-index: 2;

        .relationship__line {
          width: 90%;
          display: flex;
          margin: 0 auto;
          .line__item {
            width: 20%;
            height: 12px;
            margin-right: 2px;
          }
          .red {
            background-color: #f00;
          }
          .violet {
            background-color: #f0f;
          }
          .black {
            background-color: #000;
          }
          .yellow {
            background-color: #fdaf1d;
          }
          .gray {
            background-color: #505050;
          }
        }

        .relationship__items {
          .relationship__item {
            display: flex;
            justify-content: space-between;

            .item__details {
              width: 30%;
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }

      .main__rating {
        width: 40%;
        min-height: 270px;
        box-shadow: inset 0px 10px 20px 0px #00000082;
        margin: 0px 35px 10px;
        padding: 20px;
        align-self: flex-end;
        background: repeating-linear-gradient(
          90deg,
          #ffffff,
          #ffffff calc(100% - 99.5%),
          #d1d9d6 calc(100% - 99.5%),
          #d1d9d6 calc(100% - 85%)
        );
        border-radius: 30px;

        svg {
          margin: 33px 0px;
          g {
            text {
              color: #000;
              font-size: 10px;
            }
          }
        }
      }
    }

    &__navigation {
      justify-content: center;
      .navigation__item {
        flex: 0 1 20%;
        min-height: 200px;
        margin: 0 50px 50px 0;
        border-radius: 60px;
        box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #fff;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &:nth-child(1) {
          // background-color: #fdaf1dcc;
          background-color: #ffa407;
        }

        &:nth-child(2) {
          // background-color: #ff00ffcc;
          background-color: #cd6a7e;
        }
        &:nth-child(3) {
          background-color: #ffffff2e;
        }
        &:nth-child(4) {
          // background-color: #2a9cc1;
          background-color: #6fccd1;
        }
      }
    }
  }
}
</style>
