
export class LoadingService {
  private static loaderContainerId = "global-loader-container";
  private static spinnerElement: HTMLElement | null = null;
  private static timeoutHandle: any = null;
  private static customGif: string | null = null;

  static setGif(gifUrl: string | null) {
    this.customGif = gifUrl;
  }

  static show(message?: string) {
    this.clearExisting();

    const container = document.createElement("div");
    container.id = this.loaderContainerId;
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100vw";
    container.style.height = "100vh";
    container.style.background = "rgba(0,0,0,0.5)";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.zIndex = "9999";

    const spinner = document.createElement("div");
    if (this.customGif) {
      const img = document.createElement("img");
      img.src = this.customGif;
      img.alt = "Loading...";
      img.style.width = "120px";
      img.style.height = "120px";
      spinner.appendChild(img);
    } else {
      spinner.innerHTML = `<span class="loader"></span>`;
    }

    if (message) {
      const msg = document.createElement("p");
      msg.innerText = message;
      msg.style.color = "#fff";
      msg.style.marginTop = "15px";
      container.appendChild(spinner);
      container.appendChild(msg);
    } else {
      container.appendChild(spinner);
    }

    document.body.appendChild(container);
    this.spinnerElement = container;

    this.injectDefaultStyle();
  }

  static hide() {
    this.clearExisting();
  }

  static showHidden(ms: number) {
    this.show();
    this.timeoutHandle = setTimeout(() => {
      this.hide();
    }, ms);
  }

  private static clearExisting() {
    if (this.spinnerElement) {
      document.body.removeChild(this.spinnerElement);
      this.spinnerElement = null;
    }
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = null;
    }
  }

  private static injectDefaultStyle() {
    if (document.getElementById("loading-style")) return;

    const style = document.createElement("style");
    style.id = "loading-style";
    style.innerHTML = `
      .loader {
        position: relative;
        width: 120px;
        height: 90px;
        margin: 0 auto;
      }
      .loader:before {
        content: "";
        position: absolute;
        bottom: 30px;
        left: 50px;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background: #042ba8;
        animation: loading-bounce 0.5s ease-in-out infinite alternate;
      }
      .loader:after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        height: 7px;
        width: 45px;
        border-radius: 4px;
        box-shadow: 0 5px 0 #fff, -35px 50px 0 #fff, -70px 95px 0 #fff;
        animation: loading-step 1s ease-in-out infinite;
      }
      @keyframes loading-bounce {
        0% { transform: scale(1, 0.7) }
        40% { transform: scale(0.8, 1.2) }
        60% { transform: scale(1, 1) }
        100% { bottom: 140px }
      }
      @keyframes loading-step {
        0% {
          box-shadow: 0 10px 0 rgba(0,0,0,0),
                      0 10px 0 #fff,
                      -35px 50px 0 #fff,
                      -70px 90px 0 #fff;
        }
        100% {
          box-shadow: 0 10px 0 #fff,
                      -35px 50px 0 #fff,
                      -70px 90px 0 #fff,
                      -70px 90px 0 rgba(0,0,0,0);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

export default LoadingService;
