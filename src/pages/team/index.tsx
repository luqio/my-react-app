import {
  Flex,
  Spinner
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "react-query";

import { type ApiError, TeamsService } from "@/client";
import WorkflowTeamSettings from "@/components/Teams/WorkflowTeamSettings";
import useCustomToast from "@/hooks/useCustomToast";
import useChatTeamIdStore from "@/stores/chatTeamIDStore";

function Team() {
  const showToast = useCustomToast();
  const { teamId } = useParams() as { teamId: string };
  const { setTeamId } = useChatTeamIdStore();

  useEffect(() => {
    const numTeamId = Number(teamId);
    if (!isNaN(numTeamId)) {
      setTeamId(numTeamId);
    }
  }, [teamId, setTeamId]);

  const {
    data: team,
    isLoading,
    isError,
    error,
  } = useQuery(`team/${teamId}`, () =>
    TeamsService.readTeam({ id: Number.parseInt(teamId) }),
  );

  if (isError) {
    const errDetail = (error as ApiError).body?.detail;
    showToast("Something went wrong.", `${errDetail}`, "error");
  }

  if (isLoading) {
    return (
      <Flex
        justify="center"
        align="center"
        height="100vh"
        width="full"
        bg="ui.bgMain"
      >
        <Spinner size="xl" color="ui.main" thickness="3px" speed="0.8s" />
      </Flex>
    );
  }

  return <WorkflowTeamSettings teamId={Number.parseInt(teamId)} />;
}

export default Team;
