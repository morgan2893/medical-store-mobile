import { Stack, useRouter, useSegments } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "../services/redux/store";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

function AuthGate({ children }: Props) {
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const segments = useSegments();

  const isInAuthGroup = segments[0] === "login";

  useEffect(() => {
    if (!token && !isInAuthGroup) {
      router.replace("/login");
    }
    if (token && isInAuthGroup) {
      router.replace("/");
    }
  }, [token, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthGate>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </AuthGate>
    </Provider>
  );
}
