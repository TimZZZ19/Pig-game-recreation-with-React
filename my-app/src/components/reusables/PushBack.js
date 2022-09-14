import COUNT_DOWN from "../../mappings/COUNT_DOWN";

const PushBack = (action) => {
  setTimeout(() => action(), (COUNT_DOWN.TIME + 1) * 1000);
};

export default PushBack;
