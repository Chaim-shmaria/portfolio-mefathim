
#include<stdio.h>

#define tape_size 3000

enum ErrorCode {
    NO_ERROR = 0 ,
    POINTER_OUT_OF_RANGE_DUE_TO_FORWARD_SIGN,
    POINTER_OUT_OF_RANGE_DUE_TO_BACKWARD_SIGN,
    POINTER_OUT_OF_RANGE_DUE_TO_OPEN_BRACKET,
    POINTER_OUT_OF_RANGE_DUE_TO_CLOSE_BRACKET
};

int BFInterpreter(const char *code)
{
    char tape[tape_size] = {0};
    char *pointer = tape;
    const char *str = code;
    unsigned int loop_depth = 0, current_loop = 0;

    while (*code)
    {
        if (*code == '+'){
            (*pointer) ++;
        } else if (*code == '-')
        {
            (*pointer) --;
        } else if (*code == '<')
        {
            if (pointer <= tape) {
                return POINTER_OUT_OF_RANGE_DUE_TO_BACKWARD_SIGN;
            }
            pointer --;
        } else if (*code == '>')
        {
            if (pointer >= tape + tape_size) {
                return POINTER_OUT_OF_RANGE_DUE_TO_FORWARD_SIGN;
            }
            pointer ++;
        }  else if (*code == '.')
        {
            printf("%c", *pointer);

        } else if (*code == ',')
        {
            scanf( "%c", &*pointer);
        } else if (*code == '[')
        {

            if (!*pointer) {

                current_loop = loop_depth;
                loop_depth ++;

                while (loop_depth != current_loop)
                {

                    code ++;

                    if (*code == ']')
                    {
                        loop_depth --;
                    } else if (*code == '[')
                    {
                        loop_depth ++;
                    } else if (*code == '\0') {
                        return POINTER_OUT_OF_RANGE_DUE_TO_OPEN_BRACKET;
                    }
                }

            } else
            {
                loop_depth ++;
            }
        } else if (*code == ']')
        {

            if (*pointer)
            {
                current_loop = loop_depth;
                code--;


                while (*code != '[' | loop_depth != current_loop)
                {

                    if (*code == ']')
                    {
                        loop_depth ++;
                    } else if (*code == '[')
                    {
                        loop_depth --;

                    } else if (code < str)
                    {
                        return POINTER_OUT_OF_RANGE_DUE_TO_CLOSE_BRACKET;
                    }

                    code--;
                }
            } else
            {
                current_loop --;
            }
        }


        code ++;

    }

    return NO_ERROR;
}

int main(int argc, char const *argv[])
{
    char string[] = "++++++++[>+>++++<<-]>++>>+<[-[>>+<<-]+>>]>+[-<<<[->[+[-]+>++>>>-<<]<[<]>>++++++[<<+++++>>-]+<<++.[-]<<]>.>+[>>]>+]";
    int result = BFInterpreter(string);

    if (result == POINTER_OUT_OF_RANGE_DUE_TO_FORWARD_SIGN) {
        fprintf(stderr, "Error: Pointer out of range, due to '>' sign\n");
    }
    if (result == POINTER_OUT_OF_RANGE_DUE_TO_BACKWARD_SIGN) {
        fprintf(stderr, "Error: Pointer out of range, due to '<' sign\n");
    }
    if (result == POINTER_OUT_OF_RANGE_DUE_TO_OPEN_BRACKET) {
        fprintf(stderr, "Error: Pointer out of range, due to '[' sign\n");
    }
    if (result == POINTER_OUT_OF_RANGE_DUE_TO_CLOSE_BRACKET) {
        fprintf(stderr, "Error: Pointer out of range, due to ']' sign\n");
    }
    return NO_ERROR;
}