import { AppDataSource } from "../../../data-source";
import { User } from "../../../entity/User";

const incrementUserScore = async (id: number, scoreChange: number) => {
  await AppDataSource.manager.increment(
    User,
    {
      id: id,
    },
    "score",
    scoreChange
  );
};

export default incrementUserScore;
