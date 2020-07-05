<template>
  <main class="main">
    <div class="main__welcome">
      Welcome,
      <p>Monica</p>
    </div>
    <div class="main__infographic">
      <div class="main__relationship">
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
              <div class="item__percentage">20%</div>
            </div>
          </div>
          <div class="relationship__item">
            <div class="item__name">testing</div>
            <div class="item__details">
              <div class="item__amount">100</div>
              <div class="item__percentage">20%</div>
            </div>
          </div>
          <div class="relationship__item">
            <div class="item__name">testing</div>
            <div class="item__details">
              <div class="item__amount">100</div>
              <div class="item__percentage">20%</div>
            </div>
          </div>
          <div class="relationship__item">
            <div class="item__name">testing</div>
            <div class="item__details">
              <div class="item__amount">100</div>
              <div class="item__percentage">20%</div>
            </div>
          </div>
          <div class="relationship__item">
            <div class="item__name">testing</div>
            <div class="item__details">
              <div class="item__amount">100</div>
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
        <div class="item__value">manager</div>
        <div class="item__additional">
          954
          <p>completed tasks</p>
        </div>
      </div>
      <div class="navigation__item">
        <img src="../assets/images/passion.svg" alt="" class="item__logo" />
        <div class="item__value">passion</div>
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
  width: 100%;
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
      }

      .item__additional {
        font-family: "Montserrat Subrayada", sans-serif;
      }
    }
  }

  /* 
      ##Device = Laptops, Desktops
      ##Screen = B/w 1025px to 1280px
    */
  @media (min-width: 1025px) and (max-width: 1280px) {
    &__infographic {
      display: flex;
      justify-content: space-evenly;
      .main__relationship {
      display: flex;
      flex-direction: column;
      width: 20%;

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
      width: 60%;
      min-height: 30%;
      margin: 0px 35px 10px;
      padding: 20px;

      align-self: flex-end;

      background: repeating-linear-gradient(
        90deg,
        #505050,
        #505050 calc(100% - 99.5%),
        #000 calc(100% - 99.5%),
        #000 calc(100% - 85%)
      );
      border: 20px solid black;
      border-radius: 30px;

      svg {
        g {
          text {
            color: white;
            font-size: 10px;
          }
        }
      }
    }
    }

    &__navigation {
      .navigation__item {
        flex: 0 1 25%;
      }
    }
  }

  /* 
      ##Device = Desktops
      ##Screen = 1281px to higher resolution desktops
    */

  @media (min-width: 1281px) {
    .main {
      &__rating {
        margin: 0px 35px 10px;
        padding: 20px;
        background: repeating-linear-gradient(
          90deg,
          #505050,
          #505050 calc(100% - 99.5%),
          #000 calc(100% - 99.5%),
          #000 calc(100% - 85%)
        );
        border: 20px solid black;
        border-radius: 30px;
      }
    }

    &__navigation {
      .navigation__item {
        flex: 0 1 35%;
        height: 140px;

        &::nth-child(1) {
          background-color: #fdaf1dcc;
        }

        &::nth-child(2) {
          background-color: #ff00ffcc;
        }
      }
    }
  }
}
</style>
