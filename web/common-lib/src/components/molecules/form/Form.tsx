import { useEffect } from "react";
import Button from "../../atoms/button/Button";
import Input from "../../atoms/input/Input";
import "./form.scss";

export default function Form({
  data = null,
  extraClass = "",
  form,
  title = "",
  buttonText,
  children = null,
  hasAction = true,
  buttonAction = () => { },
  buttonDisable = true,
  onChangeForm = () => { },
  onBlurForm = () => { },
}: {
  data?: any;
  extraClass?: string;
  form: any;
  title?: string;
  buttonText: string;
  hasAction?: boolean;
  children?: any;
  buttonAction?: any;
  buttonDisable?: boolean;
  onChangeForm?: Function;
  onBlurForm?: Function;
}) {
  useEffect(() => { }, []);

  return (
    <div className={`${extraClass} gp-form`}>
      {title && <p>{title}</p>}
      <div ref={form ?? null}>
        {data ? (
          data!.map((inpForm, index) => {
            return (
              <Input
                inputData={inpForm}
                index={index}
                key={`inp-form-${index}`}
                onBlur={(e) => {
                  if (onBlurForm) {
                    onBlurForm(e);
                  }
                }}
                onChange={(e, index) => {
                  if (onChangeForm) {
                    onChangeForm(e, index);
                  }
                }}
              />
            );
          })
        ) : (
          <></>
        )}
        {children}
        {hasAction && (<Button
          type={"button"}
          disabled={buttonDisable}
          onClick={() => {
            if (buttonAction) {
              buttonAction();
            }
          }}
        >
          {buttonText}
        </Button>)}
      </div>
    </div>
  );
}
